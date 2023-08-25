import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import authUser from '../../models/userModels';
import { Types } from 'mongoose';


//Create token

const createToken = (_id: Types.ObjectId) => {
    return jwt.sign({ _id: _id }, process.env.SECRET, { expiresIn: '3d' })
}



export const readUser = async (req: any, res: any) => {
    const response = res.status(200)
    const crudList = await authUser.find()
    try {
        return response.json(crudList)
    } catch (error) {
        console.error(error)
    }
}
// Register a new user
export const authRegister = async (req: any, res: any) => {
    const { Name, Username, Email, Password } = req.body;

    try {
        // Check if user with the given username or email already exists
        const userExists = await authUser.exists({ $or: [{ Username }, { Email }] });

        if (userExists) {
            return res.status(400).json({ error: 'Username or email already in use!' });
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(Password, saltRounds);

        // Create the user
        const user = await authUser.create({
            Name,
            Username,
            Email,
            Password: hashedPassword,
        });

        const token = createToken(user._id)

        return res.status(201).json({ user, token });

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

// Login
export const loginUser = async (req: any, res: any) => {
    const { Username, Password } = req.body;

    try {
        // Checkin' if an user with the given username exists
        const user = await authUser.findOne({ Username });
        try {

            if (!user) {
                return res.status(401).json({ error: 'Invalid username' });
            }

            // ... rest of the code ...

        } catch (error) {
            console.error('Error while finding user:', error);
            return res.status(500).json({ error: 'An internal server error occurred' });
        }

        // Compare the provided password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(Password, user.Password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        // If username and password are valid, create a new JWT token
        const token = createToken(user._id);

        // Set HttpOnly cookie with the token
        res.cookie('refreshToken', token, {
            httpOnly: true,
            secure: true, // Set to true in a production environment (HTTPS)
            // other cookie options (maxAge, domain, etc.)
        });

        return res.status(200).json({ message: 'Login successful', token });

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

//Logout
export const logoutUser = async (req: any, res: any) => {
    try {
        // Clear the refreshToken cookie
        res.clearCookie('refreshToken', {
            path: '/',
            httpOnly: true,
            secure: true,
        });

        return res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        return res.status(500).json({ error: 'An internal server error occurred' });
    }
};
