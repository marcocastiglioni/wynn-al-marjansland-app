export async function fetchNavigationData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/navigation`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Error fetching navigation data');
  }
  return res.json();
}