# resource "aws_security_group" "ecs_sg" {
#   name = "ecs-sg"
#   description = "SG for ECS"
#   vpc_id = var.vpc_id
# }

# resource "aws_ecs_cluster" "ecs_cluster" {
#     name = "pastebin-cluster"

#   setting {
#     name  = "containerInsights"
#     value = "enabled"
#   }
  
# }

# resource "aws_ecs_service" "pastebin_service" {
#     name = "pastebin-service"
#     cluster = aws_ecs_cluster.ecs_cluster.id
#     launch_type = "FARGATE"

#     load_balancer {
#       target_group_arn = var.ecs_target_group_arn
#       container_name = "app"
#       container_port = 3000
#     }

# }

# resource "aws_ecs_task_definition" "app_ervice" {
#   family = "service"
#   container_definitions = jsonencode([
#     {
#       name      = "pastebin-definition"
#       image     = "service-first"
#       cpu       = 1024
#       memory    = 512
#       essential = true
#       portMappings = [
#         {
#           containerPort = 3000
#           hostPort      = 3000
#         }
#       ]
#     }
#   ])
# }