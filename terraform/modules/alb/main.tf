resource "aws_security_group" "alb_sg" {
    name = "pastebin-alb-sg"
    description = "ALB for ECS environment"
    vpc_id = var.vpc_id
}

resource "aws_vpc_security_group_egress_rule" "alb_ecs_sgr_http" {
  security_group_id = aws_security_group.alb_sg.id
  referenced_security_group_id = var.ecs_sg_id
  ip_protocol = "tcp"
  from_port = 80
  to_port = 80
}

resource "aws_vpc_security_group_egress_rule" "alb_ecs_sgr_https" {
  security_group_id = aws_security_group.alb_sg.id
  referenced_security_group_id = var.ecs_sg_id
  ip_protocol = "tcp"
  from_port = 443
  to_port = 443
}

resource "aws_vpc_security_group_ingress_rule" "alb_internet" {
  security_group_id = aws_security_group.alb_sg.id
  ip_protocol = "tcp"
  cidr_ipv4 = "0.0.0.0/0"
  from_port = 80
  to_port = 80
}

resource "aws_lb_target_group" "pastebin_tg" {
  name        = "pastebin-lb-tg"
  port        = 80
  protocol    = "HTTP"
  target_type = "ip"
  vpc_id      = var.vpc_id
  ip_address_type = "ipv4"
}

resource "aws_lb_listener" "ecs_lb_listener" {
  load_balancer_arn = aws_lb.app_load_balancer.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.pastebin_tg.arn
  }
}

resource "aws_lb" "app_load_balancer" {
  name               = "pastebin-lb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb_sg.id]
  subnets            =  [var.public_subnet_1_id, var.public_subnet_2_id]

  # access_logs {
  #   bucket  = aws_s3_bucket.lb_logs.id
  #   prefix  = "test-lb"
  #   enabled = true
  # }
}