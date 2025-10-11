variable "vpc_id"{
    description = "VPC ID"
    type = string
}

variable "public_subnet_id" {
    description = "Public subnet ID"
    type = string
}

variable "ecs_sg_id" {
  description = "ECS Security group ID"
  type = string
}