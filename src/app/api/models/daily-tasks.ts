/* tslint:disable */
import { DailyTask } from './daily-task';
export interface DailyTasks {
  daily_tasks?: Array<DailyTask>;
  available_daily_tasks: Array<string>;
  seconds_to_midnight?: number;
}
