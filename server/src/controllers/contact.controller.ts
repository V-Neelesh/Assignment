import { Request, Response, NextFunction } from 'express';
import { Contact } from '../models/Contact';

// Create a new contact
export const createContact = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { fullName, email, mobileNumber, city } = req.body;

    if (!fullName || !email || !mobileNumber || !city) {
      res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
      return;
    }

    const contact = new Contact({
      fullName,
      email,
      mobileNumber,
      city,
    });

    await contact.save();

    res.status(201).json({
      success: true,
      message: 'Contact submission received successfully',
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

// Get all contacts
export const getContacts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
};

// Get contact by ID
export const getContactById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      res.status(404).json({
        success: false,
        message: 'Contact not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

// Delete contact
export const deleteContact = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      res.status(404).json({
        success: false,
        message: 'Contact not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Contact deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
