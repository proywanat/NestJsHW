import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Repository } from 'typeorm';
import { StudentDto } from 'src/student/dto/student.dto/student-dto';
import { Student } from 'src/student/entity/student';

@Injectable()
export class StudentService {
  public students: StudentDto[] = [];
  entityManager = getManager();

  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}
  create(astd: StudentDto): Promise<StudentDto> {
    return this.studentRepository.save(astd);
  }

  loadAlls(): Promise<StudentDto[]> {
    return this.studentRepository.find();
  }

  async removeS(id: number): Promise<void> {
    await this.studentRepository.delete(id);
  }

  async loadOne(id: number): Promise<StudentDto> {
    return await this.studentRepository.findOne({ std_id: id });
  }

  N1(): Promise<StudentDto[]> {
    return this.entityManager.query(
      'select * from student order by std_name ASC;',
    );
  }

  N2(): Promise<StudentDto[]> {
    return this.entityManager.query('SELECT std_id, std_name FROM student;');
  }

  N3(): Promise<StudentDto[]> {
    return this.entityManager.query(
      'SELECT * FROM student WHERE province = "ขอนแก่น";',
    );
  }

  N4(): Promise<StudentDto[]> {
    return this.entityManager.query(
      'SELECT course.course_id, course.title, course.credit FROM register JOIN course ON register.course_id = course.course_id WHERE std_id = "5001100348";',
    );
  }

  N5(): Promise<StudentDto[]> {
    return this.entityManager.query(
      'SELECT register.std_id, SUM(credit) AS credit from register JOIN course WHERE course.course_id = register.course_id GROUP BY register.std_id;',
    );
  }

  N6(): Promise<StudentDto[]> {
    return this.entityManager.query(
      'SELECT course.course_id,course.title,COUNT(student.std_id) FROM course LEFT JOIN register ON register.course_id = course.course_id LEFT JOIN student ON register.std_id = student.std_id GROUP BY course.course_id;',
    );
  }

  N7(): Promise<StudentDto[]> {
    return this.entityManager.query(
      'SELECT student.std_id,student.std_name FROM student JOIN register ON register.std_id = student.std_id JOIN course ON register.course_id = course.course_id WHERE course.course_id = "322236";',
    );
  }
}
