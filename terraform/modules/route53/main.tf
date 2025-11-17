resource "aws_route53_zone" "main" {
  name = "weholidays.co.uk"
}

resource "aws_route53_record" "main-ns" {
  zone_id = aws_route53_zone.main.zone_id
  name    = "pastebin.weholidays.co.uk"
  type    = "A"
  alias {
    name = var.alb_dns_name
    zone_id = var.alb_zone_id
    evaluate_target_health = true
  }
}

