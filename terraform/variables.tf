variable "image_tag" {
    description = "Image tag/location from pipeline"
    type = string
}

variable "ecr_url" {
  description = "URL for ECR"
  type = string
}

variable "ecr_repository" {
    description = "ECR Respository name"
    type = string
}

variable "domain_name" {
    description = "Domain name to be used"
    type = string
}

variable "sub_domain_name" {
    description = "Sub domain name to be used"
    type = string
}



