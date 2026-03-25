import { Address } from "./entities/address.entity";
import { Role } from "./entities/role.entity";
import { User } from "./entities/user.entity";

export class UserBuilder {
  private user: User;

  constructor() {
    this.user = new User();
    this.user.addresses = [];
  }

  setUsername(username: string): UserBuilder {
    if (username) this.user.username = username;
    return this;
  }

  setEmail(email: string): UserBuilder {
    if (email) this.user.email = email;
    return this;
  }

  setPassword(password: string): UserBuilder {
    if (password) this.user.password = password;
    return this;
  }

  setRole(role: Role): UserBuilder {
    if (role) this.user.role = role;
    return this;
  }

  setAvatar(): UserBuilder {
    this.user.avatar="https://image.dienthoaivui.com.vn/x,webp,q90/https://dashboard.dienthoaivui.com.vn/uploads/dashboard/editor_upload/avatar-cute-1.jpg"
    return this;
  }

  // // Thêm địa chỉ mới (dùng cho cả POST và PATCH)
  // addAddress(location?: string, phoneNum?: string): UserBuilder {
  //   if (location && phoneNum) {
  //     const addr = new Address();
  //     addr.location = location;
  //     addr.phoneNum = phoneNum;
  //     addr.isDefault = this.user.addresses?.length === 0; 
  //     if (!this.user.addresses) this.user.addresses = [];
  //     this.user.addresses.push(addr);
  //   }
  //   return this;
  // }

  build(): User {
    return this.user;
  }
}