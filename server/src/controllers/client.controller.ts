import { Request, Response, NextFunction } from 'express';
import { Client } from '../models/Client';
import { cropImage } from '../utils/imageCrop';
import path from 'path';

// Create a new client
export const createClient = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, designation, description } = req.body;

    if (!name || !designation || !description) {
      res.status(400).json({
        success: false,
        message: 'Name, designation, and description are required',
      });
      return;
    }

    if (!req.file) {
      res.status(400).json({
        success: false,
        message: 'Image file is required',
      });
      return;
    }

    // Crop and optimize image
    const croppedImagePath = await cropImage(
      req.file.path,
      req.file.path.replace(/\.[^/.]+$/, '.webp'),
      400,
      400
    );

    const relativePath = path.relative(process.cwd(), croppedImagePath).replace(/\\/g, '/');
    const imagePath = relativePath.startsWith('/') ? relativePath : `/${relativePath}`;

    const client = new Client({
      name,
      designation,
      description,
      image: imagePath,
    });

    await client.save();

    res.status(201).json({
      success: true,
      message: 'Client created successfully',
      data: client,
    });
  } catch (error) {
    next(error);
  }
};

// Get all clients
export const getClients = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: clients,
    });
  } catch (error) {
    next(error);
  }
};

// Get client by ID
export const getClientById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const client = await Client.findById(req.params.id);

    if (!client) {
      res.status(404).json({
        success: false,
        message: 'Client not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: client,
    });
  } catch (error) {
    next(error);
  }
};

// Update client
export const updateClient = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, designation, description } = req.body;
    const updateData: any = {};

    if (name) updateData.name = name;
    if (designation) updateData.designation = designation;
    if (description) updateData.description = description;

    if (req.file) {
      const croppedImagePath = await cropImage(
        req.file.path,
        req.file.path.replace(/\.[^/.]+$/, '.webp'),
        400,
        400
      );
      const relativePath = path.relative(process.cwd(), croppedImagePath).replace(/\\/g, '/');
      updateData.image = relativePath.startsWith('/') ? relativePath : `/${relativePath}`;
    }

    const client = await Client.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!client) {
      res.status(404).json({
        success: false,
        message: 'Client not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Client updated successfully',
      data: client,
    });
  } catch (error) {
    next(error);
  }
};

// Delete client
export const deleteClient = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);

    if (!client) {
      res.status(404).json({
        success: false,
        message: 'Client not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Client deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
