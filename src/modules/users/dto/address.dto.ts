import { ApiProperty } from "@nestjs/swagger";


export class AddressDto{
    @ApiProperty({
        example: '839 Le Van Luong, Nha Be, TP.HCM',
        description: 'Địa chỉ '
    })
    location: string;

    @ApiProperty({
        example: '0123456789',
        description: 'Số điện thoại'
    })
    phoneNum: string;

}