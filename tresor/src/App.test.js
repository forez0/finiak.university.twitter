import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

// Mocking the useGoogleLogin hook
jest.mock('@react-oauth/google', () => ({
  useGoogleLogin: jest.fn(),
}));

describe('App Component', () => {
  beforeEach(() => {
    // Reset the mock implementation before each test
    jest.clearAllMocks();
  });

  it('renders the component', () => {
    // Mocking the login function returned by useGoogleLogin hook
    const mockLogin = jest.fn();
    // Mocking useState to provide initial null userInfo
    jest.spyOn(React, 'useState').mockReturnValue([null, jest.fn()]);
    // Mocking the useGoogleLogin hook to return our mock login function
    require('@react-oauth/google').useGoogleLogin.mockReturnValue(mockLogin);

    render(<App />);

    // Asserting that the component renders without crashing
    expect(screen.getByText('Tresor')).toBeInTheDocument();
    expect(screen.getByText('Continue with Google')).toBeInTheDocument();
  });

  it('calls login function when "Continue with Google" button is clicked', async () => {
    // Mocking the login function returned by useGoogleLogin hook
    const mockLogin = jest.fn();
    // Mocking useState to provide initial null userInfo
    jest.spyOn(React, 'useState').mockReturnValue([null, jest.fn()]);
    // Mocking the useGoogleLogin hook to return our mock login function
    require('@react-oauth/google').useGoogleLogin.mockReturnValue(mockLogin);

    render(<App />);

    // Finding the "Continue with Google" button and simulating a click event
    fireEvent.click(screen.getByText('Continue with Google'));

    // Asserting that the login function is called
    expect(mockLogin).toHaveBeenCalled();
  });

  it('displays user info after successful login', async () => {
    // Mocking the login function returned by useGoogleLogin hook
    const mockLogin = jest.fn();
    // Mocking useState to provide initial null userInfo
    jest.spyOn(React, 'useState').mockReturnValue([{ name: 'John Doe', email: 'john@example.com' }, jest.fn()]);
    // Mocking the useGoogleLogin hook to return our mock login function
    require('@react-oauth/google').useGoogleLogin.mockReturnValue(mockLogin);

    render(<App />);

    // Asserting that the user info is displayed
    expect(screen.getByText('Name: John Doe')).toBeInTheDocument();
    expect(screen.getByText('Email: john@example.com')).toBeInTheDocument();
  });
});
