import { StaticDate } from './offeredCourse.constant';
import { TSchedule } from './offeredCourse.interface';

export const hasTimeConflict = (
  assignedSchedules: TSchedule[],
  newSchedule: TSchedule
) => {
  for (const schedule of assignedSchedules) {
    const existingStartTime = new Date(`${StaticDate}${schedule.startTime}`);
    const existingEndTime = new Date(`${StaticDate}${schedule.endTime}`);
    const newStartTime = new Date(`${StaticDate}${newSchedule.startTime}`);
    const newEndTime = new Date(`${StaticDate}${newSchedule.endTime}`);

    if (newStartTime < existingEndTime && newEndTime > existingStartTime) {
      return true;
    }
  }
  return false;
};
