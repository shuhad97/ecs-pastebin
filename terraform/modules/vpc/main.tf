resource "aws_vpc" "vpc" {
    cidr_block = var.vpc_cidr

    tags = {
      Name = "${var.project_name}-vpc"
    }
}

resource "aws_subnet" "public_subnet_1" {
    vpc_id = aws_vpc.vpc.id
    cidr_block = var.public_subnet_cidr_1
    availability_zone = var.public_subnet_1_az

    tags = {
      Name = "${var.project_name}-public-subnet"
    }
}

resource "aws_subnet" "public_subnet_2" {
    vpc_id = aws_vpc.vpc.id
    cidr_block = var.public_subnet_cidr_2
    availability_zone = var.public_subnet_2_az

    tags = {
      Name = "${var.project_name}-public-subnet"
    }
}


resource "aws_subnet" "private_subnet_1" {
    vpc_id = aws_vpc.vpc.id
    cidr_block = var.private_subnet_cidr_1
    availability_zone = var.private_subnet_1_az
    
    tags = {
      Name = "${var.project_name}-private-subnet-1"
    }
}

resource "aws_subnet" "private_subnet_2" {
    vpc_id = aws_vpc.vpc.id
    cidr_block = var.private_subnet_cidr_2
    availability_zone = var.private_subnet_2_az
    
    tags = {
      Name = "${var.project_name}-private-subnet-2"
    }
}

resource "aws_internet_gateway" "igw" {
    vpc_id = aws_vpc.vpc.id

    tags = {
        Name = "${var.project_name}-igw"
    }
}

resource "aws_route_table" "public_route_table"{
    vpc_id = aws_vpc.vpc.id

    route{
        cidr_block = var.public_route_table_cidr
        gateway_id = aws_internet_gateway.igw.id
    }

}

resource "aws_route_table_association" "public_assoc_1" {
    subnet_id = aws_subnet.public_subnet_1.id
    route_table_id = aws_route_table.public_route_table.id
}

resource "aws_route_table_association" "public_assoc_2" {
    subnet_id = aws_subnet.public_subnet_2.id
    route_table_id = aws_route_table.public_route_table.id
}

resource "aws_nat_gateway" "ngw_private_subnet_1" {
    subnet_id = aws_subnet.public_subnet_1.id
    allocation_id = aws_eip.ngw_private_1.allocation_id

    depends_on = [ aws_internet_gateway.igw ]
}

resource "aws_nat_gateway" "ngw_private_subnet_2" {
    subnet_id = aws_subnet.public_subnet_2.id
    allocation_id = aws_eip.ngw_private_2.allocation_id

    depends_on = [ aws_internet_gateway.igw ]

}

resource "aws_eip" "ngw_private_1" {
  domain   = "vpc"
}

resource "aws_eip" "ngw_private_2" {
  domain   = "vpc"
}

resource "aws_route_table" "private_route_table_1" {
    vpc_id = aws_vpc.vpc.id

    route {
        cidr_block = var.public_route_table_cidr
        nat_gateway_id = aws_nat_gateway.ngw_private_subnet_1.id
    }
  
}

resource "aws_route_table" "private_route_table_2" {
    vpc_id = aws_vpc.vpc.id

    route {
        cidr_block = var.public_route_table_cidr
        nat_gateway_id = aws_nat_gateway.ngw_private_subnet_2.id
    }
  
}

resource "aws_route_table_association" "private_assoc_1" {
    subnet_id = aws_subnet.private_subnet_1.id
    route_table_id = aws_route_table.private_route_table_1.id
}

resource "aws_route_table_association" "private_assoc_2" {
    subnet_id = aws_subnet.private_subnet_2.id
    route_table_id = aws_route_table.private_route_table_2.id
}
