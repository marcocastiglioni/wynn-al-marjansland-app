export async function fetchNavigationData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_INTERNAL}api/navigation`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Error fetching navigation data');
  }
  return res.json();
}