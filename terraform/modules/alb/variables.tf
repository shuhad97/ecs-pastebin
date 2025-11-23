variable "vpc_id"{
    description = "VPC ID"
    type = string
}

variable "public_subnet_1_id" {
    description = "Public subnet ID 1"
    type = string
}

variable "public_subnet_2_id" {
    description = "Public subnet ID 2"
    type = string
}

variable "ecs_sg_id" {
  description = "ECS Security group ID"
  type = string
}

variable "aws_acm_certificate_validation_arn" {
    description = "Certificate validation ARN"
    type = string
}