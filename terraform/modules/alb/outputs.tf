output "alb_arn" {
    value = aws_lb.app_load_balancer.arn
}

output "alb_sg"{
    value = aws_security_group.alb_sg.id
}
output "pastebin_tg_arn" {
    value = aws_lb_target_group.pastebin_tg.arn
}

output "alb_dns_name"{
    value = aws_lb.app_load_balancer.dns_name
}

output "alb_zone_id"{
    value = aws_lb.app_load_balancer.zone_id
}