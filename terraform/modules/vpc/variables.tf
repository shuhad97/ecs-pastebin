
variable "vpc_cidr" {
  description = "CIDR block for the VPC"
  type        = string
  default     = "10.0.0.0/22"
}

variable "public_subnet_cidr" {
  description = "CIDR block for the public subnet"
  type        = string
  default     = "10.0.0.0/25"
}

variable "private_subnet_cidr_1" {
  description = "CIDR block for the private subnet"
  type        = string
  default     = "10.0.0.128/24"
}

variable "private_subnet_cidr_2" {
  description = "CIDR block for the private subnet"
  type        = string
  default     = "10.0.1.0/24"
}

variable "private_subnet_1_az" {
  description = "Availability zone for subnet 1"
  type        = string
  default     = "eu-west-2a"
}

variable "private_subnet_2_az" {
  description = "Availability zone for subnet 2"
  type        = string
  default     = "eu-west-2b"
}

variable "public_route_table_cidr" {
  description = "Route table CIDR"
  type        = string
  default     = "0.0.0.0/0"
}

variable "project_name" {
  type    = string
  default = "ecs-pastebin"
}
