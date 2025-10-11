variable "alb_id" {
    description = "ID for ALB"
    type = string
}

variable "vpc_id" {
    description = "ID for VPC"
    type = string
}

variable "ecs_target_group_arn" {
    description = "ARN for the ECS Target group"
    type = string
}