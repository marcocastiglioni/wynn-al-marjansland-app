import navigationData from '@/data/navigation.json';

export function GET(request: Request) {
  return new Response(JSON.stringify(navigationData), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
