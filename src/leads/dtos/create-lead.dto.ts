import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateLeadDto {
  @ApiPropertyOptional({ example: 1234 })
  lid?: number;

  @ApiProperty({ example: 567 })
  luid: number;

  @ApiPropertyOptional({ example: 789 })
  lcid?: number;

  @ApiProperty({ example: '2022-04-08' })
  ladate: string = new Date().toISOString().slice(0, 10);

  @ApiProperty({ example: 'Qualified' })
  lstatus: string = 'Qualified';

  @ApiProperty({ example: 'I' })
  lstatus2: string = 'I';

  @ApiProperty({ example: 'Residential' })
  ltype: string = 'Residential';

  @ApiPropertyOptional()
  lservice?: string;

  @ApiPropertyOptional()
  lstatusuid?: number;

  @ApiPropertyOptional()
  lstatusreason?: string;

  @ApiPropertyOptional()
  lstatusdate?: string;

  @ApiPropertyOptional()
  llastcontact?: string;

  @ApiPropertyOptional()
  llastcontactuid?: number;

  @ApiProperty({ example: 'Door-to-Door' })
  lsource: string = 'Door-to-Door';

  @ApiPropertyOptional()
  lcomp?: string;

  @ApiPropertyOptional({ example: 'John Doe' })
  lcontact?: string;

  @ApiPropertyOptional({ example: 'Mr.' })
  ltitle?: string;

  @ApiPropertyOptional({ example: '555-123-4567' })
  lphone?: string;

  @ApiPropertyOptional({ example: 'johndoe@example.com' })
  lemail?: string;

  @ApiPropertyOptional({ example: 'Jane Doe' })
  lcontact2?: string;

  @ApiPropertyOptional({ example: 'Ms.' })
  ltitle2?: string;

  @ApiPropertyOptional({ example: '555-867-5309' })
  lphone2?: string;

  @ApiPropertyOptional({ example: 'janedoe@example.com' })
  lemail2?: string;

  @ApiPropertyOptional()
  lemail2cc?: string;

  @ApiPropertyOptional({ example: 'Residence' })
  lbtype?: string;

  @ApiPropertyOptional()
  lbfloors?: number;

  @ApiPropertyOptional()
  lbroofmat?: string;

  @ApiPropertyOptional()
  lbhatch?: string;

  @ApiPropertyOptional()
  lbheight?: number;

  @ApiPropertyOptional()
  linspection?: string;

  @ApiPropertyOptional()
  linspectioncomp?: string;

  @ApiPropertyOptional()
  linspectionnotes?: string;

  @ApiPropertyOptional()
  llocnotes?: string;

  @ApiPropertyOptional()
  lapp?: string;

  @ApiPropertyOptional()
  linvpays?: string;

  @ApiPropertyOptional()
  linsuranceco?: string;

  @ApiPropertyOptional()
  lclaimnum?: string;

  @ApiPropertyOptional()
  lsimpleinspections?: string;

  // Additional fields as per your table structure
  @ApiPropertyOptional()
  llname?: string;

  @ApiPropertyOptional()
  laddr1?: string;

  @ApiPropertyOptional()
  laddr2?: string;

  @ApiPropertyOptional()
  lcity?: string;

  @ApiPropertyOptional()
  lst?: string;

  @ApiPropertyOptional()
  lzip?: string;

  @ApiPropertyOptional()
  llatlon?: string;

  @ApiPropertyOptional()
  lext?: string;

  @ApiPropertyOptional()
  laltphone?: string;

  @ApiPropertyOptional()
  laltext?: string;

  @ApiPropertyOptional()
  llotid?: string;

  @ApiPropertyOptional()
  lnotes?: string;

  @ApiPropertyOptional()
  lfax?: string;
}
