import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AuthRegisterDto } from 'src/auth/dto/auth-register.dto';
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  // Helper function to control file upload destination and filename
  private static editFileName(req, file, callback) {
    const fileExtName = extname(file.originalname);
    const fileName = `${Date.now()}-${file.originalname}`;
    callback(null, fileName);
  }

  @Post('register')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/profile-images', // Directory where images will be stored
        filename: UserController.editFileName, // Naming strategy for uploaded files
      }),
    }),
  )
  async register(
    @Body() authRegisterDto: AuthRegisterDto, // Validate request body using DTO
    @UploadedFile() image: Express.Multer.File, // Image handling with Multer
  ) {
    const { email, password, name, gender } = authRegisterDto;
    const imagePath = image ? image.filename : null; // Use image filename if uploaded

    // Fix: Pass all required arguments to createUser()
    return this.userService.createUser(
      email,
      password,
      name,
      gender,
      imagePath,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile() {
    return { message: 'This is a protected route' };
  }
}
