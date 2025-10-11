variable "db_user" {
  description = "Database administrator username"
  type        = string
  sensitive   = true
}

variable "db_password" {
  description = "Database administrator password"
  type        = string
  sensitive   = true
}

variable "vpc_id" {
  description = "VPC ID"
  type        = string
}

variable "private_subnet_id_1" {
  description = "private subnet id 1"
  type        = string
}

variable "private_subnet_id_2" {
  description = "private subnet id 2"
  type        = string
}

variable "ecs_sg_id" {
  description = "ECS Security group"
  type        = string
}
