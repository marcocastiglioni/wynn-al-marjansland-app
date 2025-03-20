export async function registerUser(data: any) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`Registration failed: ${errorBody}`);
    }
    
    return response.json();
}