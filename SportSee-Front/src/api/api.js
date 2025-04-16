import axios from 'axios';

const BASE_URL = 'http://localhost:3000/user';
const USE_API = true

export const getUserInfo = async (userId) => {
  try {
    if (USE_API) {
      const response = await axios.get(`${BASE_URL}/${userId}`);
      return response.data;
    } else {
      const response = await fetch(`/mock/user${userId}.json`)
      const data = await response.json()
      return data
    }

  } catch (error) {
    console.error('Error fetching user info:', error);
    throw error;
  }
};

export const getUserActivity = async (userId) => {
  try {
    if (USE_API) {
      const response = await axios.get(`${BASE_URL}/${userId}/activity`);
      return response.data;
    } else {
      const response = await fetch(`/mock/userActivity${userId}.json`)
      const data = await response.json()
      return data
    }
  } catch (error) {
    console.error('Error fetching user activity:', error);
    throw error;
  }
};

export const getUserAverageSessions = async (userId) => {
  try {
    if (USE_API) {
      const response = await axios.get(`${BASE_URL}/${userId}/average-sessions`);
      return response.data;
    } else {
      const response = await fetch(`/mock/userAverageSession${userId}.json`)
      const data = await response.json()
      return data
    }
  } catch (error) {
    console.error('Error fetching user average sessions:', error);
    throw error;
  }
};

export const getUserPerformance = async (userId) => {
  try {
    if (USE_API) {
    const response = await axios.get(`${BASE_URL}/${userId}/performance`);
    return response.data;
  } else {
    const response = await fetch(`/mock/userPerformance${userId}.json`)
      const data = await response.json()
      return data
  }
  } catch (error) {
    console.error('Error fetching user performance:', error);
    throw error;
  }
};