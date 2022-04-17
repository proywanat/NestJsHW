import { StudentDto } from 'src/student/dto/student.dto/student-dto';
import { StudentService } from 'src/student/service/student/student.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller('student')
export class StudentController {
  constructor(private studentService: StudentService) {}
  @Post()
  create(@Body() newStudent: StudentDto): Promise<StudentDto> {
    return this.studentService.create(newStudent);
  }

  @Get()
  loadAll(): Promise<StudentDto[]> {
    return this.studentService.loadAlls();
  }

  @Delete(':id')
  async deletestd(@Param('id') id: number): Promise<any> {
    await this.studentService.removeS(id);
    return { sucesss: true };
  }

  @Put(':id')
  async updatestd(
    @Param('id') id: number,
    @Body() sdto: StudentDto,
  ): Promise<StudentDto> {
    const std = await this.studentService.loadOne(id);
    std.std_id = sdto.std_id;
    std.std_name = sdto.std_name;
    std.province = sdto.province;
    return await this.studentService.create(std);
  }

  @Get('No1')
  No1(): Promise<StudentDto[]> {
    return this.studentService.N1();
  }

  @Get('No2')
  No2(): Promise<StudentDto[]> {
    return this.studentService.N2();
  }

  @Get('No3')
  No3(): Promise<StudentDto[]> {
    return this.studentService.N3();
  }

  @Get('No4')
  No4(): Promise<StudentDto[]> {
    return this.studentService.N4();
  }

  @Get('No5')
  No5(): Promise<StudentDto[]> {
    return this.studentService.N5();
  }

  @Get('No6')
  No6(): Promise<StudentDto[]> {
    return this.studentService.N6();
  }

  @Get('No7')
  No7(): Promise<StudentDto[]> {
    return this.studentService.N7();
  }
}
