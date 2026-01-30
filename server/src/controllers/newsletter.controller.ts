import { Request, Response, NextFunction } from 'express';
import { Newsletter } from '../models/Newsletter';

// Subscribe to newsletter
export const subscribeNewsletter = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({
        success: false,
        message: 'Email is required',
      });
      return;
    }

    const newsletter = new Newsletter({
      email,
    });

    await newsletter.save();

    res.status(201).json({
      success: true,
      message: 'Successfully subscribed to newsletter',
      data: newsletter,
    });
  } catch (error: any) {
    if (error.code === 11000) {
      res.status(400).json({
        success: false,
        message: 'Email is already subscribed',
      });
      return;
    }
    next(error);
  }
};

// Get all newsletter subscribers
export const getNewsletterSubscribers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const subscribers = await Newsletter.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: subscribers,
    });
  } catch (error) {
    next(error);
  }
};

// Unsubscribe from newsletter
export const unsubscribeNewsletter = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const subscriber = await Newsletter.findByIdAndDelete(id);

    if (!subscriber) {
      res.status(404).json({
        success: false,
        message: 'Subscriber not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Successfully unsubscribed from newsletter',
    });
  } catch (error) {
    next(error);
  }
};
