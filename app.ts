import { addHours, addDays, subHours, subDays, format } from 'date-fns';

type TimeUnits = 'hour' | 'hours' | 'day' | 'days';

interface ParsedInput {
  value: number;
  unit: TimeUnits;
  direction: 'ago' | 'in the future';
}

function parseInput(input: string): ParsedInput | null {
  const regex = /(\d+)\s*(hour|hours|day|days)\s*(ago|in the future)/i;
  const match = input.match(regex);

  if (!match) {
    console.error("Invalid input format");
    return null;
  }

  const value = parseInt(match[1], 10);
  const unit = match[2] as TimeUnits;
  const direction = match[3] as 'ago' | 'in the future';

  return { value, unit, direction };
}

function calculateDate(parsed: ParsedInput, now = new Date()): Date {
  if (parsed.unit.startsWith('hour')) {
    return parsed.direction === 'ago' ? subHours(now, parsed.value) : addHours(now, parsed.value);
  } else if (parsed.unit.startsWith('day')) {
    return parsed.direction === 'ago' ? subDays(now, parsed.value) : addDays(now, parsed.value);
  }

  return now; // Fallback to now, should not reach here normally
}

function formatDate(date: Date): string {
  return format(date, "EEEE, MMMM do yyyy, h:mm:ss a");
}

function getFullDate(input: string): string {
  const parsed = parseInput(input);

  if (!parsed) {
    return "Invalid input. Please try again.";
  }

  const calculatedDate = calculateDate(parsed);
  const formattedDate = formatDate(calculatedDate);
  return `${parsed.value} ${parsed.unit} ${parsed.direction} was ${formattedDate}`;
}

// Example Usage
console.log(getFullDate("10 hours ago"));
console.log(getFullDate("2 days in the future"));
