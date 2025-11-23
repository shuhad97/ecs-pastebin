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