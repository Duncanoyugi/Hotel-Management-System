import { ConflictException, Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      phone: '123-456-7890',
      checkInDate: new Date('2023-10-01'),
      checkOutDate: new Date('2023-10-10'),
      roomNumber: 101,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      name: 'Duncan Ochieng',
      email: 'ochiengdun@gmail.com',
      phone: '+254-798-123-456',
      checkInDate: new Date('2025-06-10'),
      checkOutDate: new Date('2025-06-20'),
      roomNumber: 101,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
  private nextId = 3;

  //methods
  create(data: CreateUserDto): User {
    const existingUser = this.users.find((user) => user.email === data.email);
    if (existingUser) {
      throw new ConflictException(
        `Guest with email ${data.email} already exists`,
      );
    }
    if (
      data.checkInDate &&
      data.checkOutDate &&
      data.checkInDate >= data.checkOutDate
    ) {
      throw new ConflictException(
        'Check-in date must be before check-out date',
      );
    }
    const newUser: User = {
      id: this.nextId++,
      ...data,
      checkInDate: data.checkInDate ? new Date(data.checkInDate) : undefined,
      checkOutDate: data.checkOutDate ? new Date(data.checkOutDate) : undefined,
      isActive: data.isActive ?? true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.push(newUser);
    return newUser;
  }

  /**
   * Finds all Guests in the system.
   * @params
   * @return user[]
   */
    findAll(): User[] {
        return this.users;
    }
    /**
     * F
  //   private users: User[] = [];
  //   private idCounter = 1;

  //   create(createUserDto: CreateUserDto): User {
  //     const newUser: User = {
  //       id: this.idCounter++,
  //       ...createUserDto,
  //       createdAt: new Date(),
  //       updatedAt: new Date(),
  //     };
  //     this.users.push(newUser);
  //     return newUser;
  //   }

  //   findAll(): User[] {
  //     return this.users.filter((user) => !user.deletedAt);
  //   }

  //   findOne(id: number): User | undefined {
  //     return this.users.find((user) => user.id === id && !user.deletedAt);
  //   }

  //   update(id: number, updateUserDto: UpdateUserDto): User | undefined {
  //     const user = this.findOne(id);
  //     if (user) {
  //       Object.assign(user, updateUserDto, { updatedAt: new Date() });
  //       return user;
  //     }
  //     return undefined;
  //   }

  //   remove(id: number): User | undefined {
  //     const user = this.findOne(id);
  //     if (user) {
  //       user.deletedAt = new Date();
  //       return user;
  //     }
  //     return undefined;
  //   }
}
