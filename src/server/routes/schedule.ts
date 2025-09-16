import express from 'express';
import Schedule from '../models/Schedule';
import { authenticateToken, authorizeRole } from '../middleware/auth';

const router = express.Router();

// Helper function to check if two time slots overlap
const hasTimeConflict = (slot1: any, slot2: any) => {
  return (
    slot1.dayOfWeek === slot2.dayOfWeek &&
    ((slot1.startTime >= slot2.startTime && slot1.startTime < slot2.endTime) ||
      (slot1.endTime > slot2.startTime && slot1.endTime <= slot2.endTime) ||
      (slot1.startTime <= slot2.startTime && slot1.endTime >= slot2.endTime))
  );
};

// Find alternative time slots
const findAlternativeSlot = async (schedule: any) => {
  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00'
  ];
  const rooms = ['101', '102', '103', '104', '105'];

  for (const room of rooms) {
    for (const startTime of timeSlots) {
      const endTime = startTime.split(':')[0] + ':50';
      const existingConflict = await Schedule.findOne({
        dayOfWeek: schedule.dayOfWeek,
        room,
        $or: [
          {
            startTime: { $lt: endTime },
            endTime: { $gt: startTime }
          }
        ]
      });

      if (!existingConflict) {
        return {
          ...schedule,
          room,
          startTime,
          endTime
        };
      }
    }
  }
  return null;
};

// Create a new schedule with conflict resolution
router.post('/', authenticateToken, authorizeRole(['admin']), async (req, res) => {
  try {
    const newSchedule = req.body;
    
    // Check for conflicts
    const conflict = await Schedule.findOne({
      dayOfWeek: newSchedule.dayOfWeek,
      room: newSchedule.room,
      $or: [
        {
          startTime: { $lt: newSchedule.endTime },
          endTime: { $gt: newSchedule.startTime }
        }
      ]
    });

    if (conflict) {
      // Try to find alternative slot
      const alternativeSlot = await findAlternativeSlot(newSchedule);
      if (alternativeSlot) {
        const schedule = new Schedule(alternativeSlot);
        await schedule.save();
        return res.json({
          message: 'Schedule created with alternative slot',
          schedule,
          wasReallocated: true
        });
      } else {
        return res.status(409).json({
          message: 'No alternative slots available'
        });
      }
    }

    const schedule = new Schedule(newSchedule);
    await schedule.save();
    res.json({ message: 'Schedule created successfully', schedule });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all schedules
router.get('/', authenticateToken, async (req, res) => {
  try {
    const schedules = await Schedule.find().populate('course');
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;