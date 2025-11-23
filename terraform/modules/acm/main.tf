resource "aws_acm_certificate" "cert" {
  domain_name       = "pastebin.weholidays.co.uk"
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_acm_certificate_validation" "cert_validation" {
    certificate_arn = aws_acm_certificate.cert.arn
}