output "alb_id" {
    value = aws_lb.app_load_balancer.id
}

output "ecs_target_group_arn" {
    value = aws_lb_target_group.ip-pastebin.arn
}