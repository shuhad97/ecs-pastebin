variable "domain_name" {
    description = "Domain name for hosted zone"
    type = string
}

variable "sub_domain_name" {
    description = "Sub domain name for records"
    type = string
}

variable "alb_dns_name"{
    description = "DNS name for ALB"
    type = string
}

variable "alb_zone_id" {
  description = "ALB zone id"
  type = string
}

variable "domain_validation_options" {
  description = "Subdomain validation options"
  type = list(object({
    domain_name = string
    resource_record_name = string
    resource_record_type = string
    resource_record_value = string
  }))
}