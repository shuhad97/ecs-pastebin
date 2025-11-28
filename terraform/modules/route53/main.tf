resource "aws_route53_zone" "main" {
  name = var.domain_name
}

resource "aws_route53_record" "main-ns" {
  zone_id = aws_route53_zone.main.zone_id
  name    = var.sub_domain_name
  type    = "A"
  alias {
    name = var.alb_dns_name
    zone_id = var.alb_zone_id
    evaluate_target_health = true
  }
}

resource "aws_route53_record" "dns_validation" {
  zone_id = aws_route53_zone.main.zone_id
  
  name = var.domain_validation_options[0].resource_record_name 
  type = var.domain_validation_options[0].resource_record_type
  records = [ var.domain_validation_options[0].resource_record_value]
  ttl = 300
}