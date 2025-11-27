
variable "vpc_id" {
    description = "ID for VPC"
    type = string
}

variable "pastebin_tg_arn" {
    description = "ARN for the ECS Target group"
    type = string
}

variable "alb_sg" {
    description = "ARN for the ECS Target group"
    type = string
}

variable "private_subnet_1_id"{
    description = "Private subnet 1"
    type = string
}

variable "private_subnet_2_id"{
    description = "Private subnet 2"
    type = string
}

variable "image_tag" {
    description = "Image tag/location from pipeline"
    type = string
    default = "latest"
}