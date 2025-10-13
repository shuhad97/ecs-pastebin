resource "aws_security_group" "alb_sg" {
    name = "pastebin-alb-sg"
    description = "ALB for ECS environment"
    vpc_id = var.vpc_id
}

resource "aws_vpc_security_group_ingress_rule" "allow_all_traffic" {
  security_group_id = aws_security_group.alb_sg.id
  cidr_ipv4 = "0.0.0.0/0"
  ip_protocol = "-1"
}

resource "aws_vpc_security_group_egress_rule" "allow_alb_outbound_ecs" {
  security_group_id = aws_security_group.alb_sg.id
  referenced_security_group_id = var.ecs_sg_id
  ip_protocol = "tcp"
  from_port = 3000
  to_port = 3000
}

resource "aws_lb_target_group" "ip_pastebin_tg" {
  name        = "pastebin-lb-tg"
  port        = 3000
  protocol    = "HTTP"
  target_type = "ip"
  vpc_id      = var.vpc_id
}

resource "aws_lb_listener" "ecs_lb_listener" {
  load_balancer_arn = aws_lb.app_load_balancer.arn
  port              = "3000"
  protocol          = "HTTPS"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.ip-pastebin.arn
  }
}

resource "aws_lb" "app_load_balancer" {
  name               = "pastebin-lb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb_sg.id]
  subnets            =  [var.public_subnet_id]


  # access_logs {
  #   bucket  = aws_s3_bucket.lb_logs.id
  #   prefix  = "test-lb"
  #   enabled = true
  # }
}