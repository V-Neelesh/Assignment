import { Request, Response, NextFunction } from 'express';
import { Project } from '../models/Project';
import { cropImage } from '../utils/imageCrop';
import path from 'path';

// Format image path for API response
const formatImagePath = (imagePath: string): string => {
  // Convert Windows path separators to forward slashes
  const normalizedPath = imagePath.replace(/\\/g, '/');
  // Remove 'uploads/' prefix if it exists and replace with absolute URL path
  const relativePath = normalizedPath.includes('uploads') 
    ? normalizedPath.substring(normalizedPath.lastIndexOf('uploads'))
    : normalizedPath;
  return `/api/files/${relativePath}`;
};

// Create a new project
export const createProject = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      res.status(400).json({
        success: false,
        message: 'Name and description are required',
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
      450,
      350
    );

    const relativePath = path.relative(process.cwd(), croppedImagePath).replace(/\\/g, '/');
    const imagePath = relativePath.startsWith('/') ? relativePath : `/${relativePath}`;

    const project = new Project({
      name,
      description,
      image: imagePath,
    });

    await project.save();

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

// Get all projects
export const getProjects = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    next(error);
  }
};

// Get project by ID
export const getProjectById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      res.status(404).json({
        success: false,
        message: 'Project not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

// Update project
export const updateProject = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, description } = req.body;
    const updateData: any = {};

    if (name) updateData.name = name;
    if (description) updateData.description = description;

    if (req.file) {
      const croppedImagePath = await cropImage(
        req.file.path,
        req.file.path.replace(/\.[^/.]+$/, '.webp'),
        450,
        350
      );
      const relativePath = path.relative(process.cwd(), croppedImagePath).replace(/\\/g, '/');
      updateData.image = relativePath.startsWith('/') ? relativePath : `/${relativePath}`;
    }

    const project = await Project.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!project) {
      res.status(404).json({
        success: false,
        message: 'Project not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Project updated successfully',
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

// Delete project
export const deleteProject = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      res.status(404).json({
        success: false,
        message: 'Project not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Project deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
