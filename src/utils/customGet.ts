

export const customGet = async (url: string, accessToken: string | null) => {
  if (!accessToken) {
    throw new Error('No access token available');
  }

  try {
    console.log("token", accessToken);
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (res.status === 401) {
      // Token expired or invalid
      throw new Error('Authentication failed. Please log in again.');
    }

    if (res.status === 404) {
      // Resource not found
      console.warn(`Resource not found: ${url}`);
      return null;
    }

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    // console.log('Data fetched successfully:', data);
    return data;
  } catch (error) {
    console.error('Error in customGet:', error);
    // Return null instead of throwing to prevent page crashes
    return null;
  }
};
