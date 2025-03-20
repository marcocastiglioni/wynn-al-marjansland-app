export async function fetchNavigationData() {
    const res = await fetch('http://localhost:3000/api/navigation', { cache: 'no-store' });
    if (!res.ok) {
      throw new Error('Error fetching navigation data');
    }
    return res.json();
  }
  