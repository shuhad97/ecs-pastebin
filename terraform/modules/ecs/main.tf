resource "aws_security_group" "ecs_sg" {
  name = "ecs-sg"
  description = "SG for ECS"
  vpc_id = var.vpc_id
}

resource "aws_vpc_security_group_ingress_rule" "ecs_alb_sgr" {
  security_group_id = aws_security_group.ecs_sg.id
  referenced_security_group_id = var.alb_sg
  ip_protocol = "tcp"
  from_port = 80
  to_port = 80
}

resource "aws_vpc_security_group_egress_rule" "ecs_internet_egress" {
  security_group_id = aws_security_group.ecs_sg.id
  ip_protocol = "-1"
  cidr_ipv4 = "0.0.0.0/0"
}

data "aws_iam_role" "ecs_task_execution_role" {
  name = "ecsTaskExecutionRole"
}

resource "aws_ecs_cluster" "ecs_cluster" {
    name = "pastebin-cluster"

  setting {
    name  = "containerInsights"
    value = "enabled"
  }
  
}


resource "aws_ecs_service" "pastebin_service" {
    name = "pastebin-service"
    launch_type = "FARGATE"
    task_definition = aws_ecs_task_definition.app_task_definition.arn
    cluster = aws_ecs_cluster.ecs_cluster.id
    desired_count = 1
    load_balancer {
      target_group_arn = var.pastebin_tg_arn
      container_name = "pastebin-container"
      container_port = 80
    }

    network_configuration {
      subnets = [var.private_subnet_1_id, var.private_subnet_2_id]
      security_groups = [ aws_security_group.ecs_sg.id ]
    }

}

resource "aws_ecs_task_definition" "app_task_definition" {
  family = "pastebin-task-definition"
  network_mode = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu = 1024
  memory = 3072
  execution_role_arn = data.aws_iam_role.ecs_task_execution_role.arn
  container_definitions = jsonencode([
    {
      name      = "pastebin-container"
      image     = "559494320357.dkr.ecr.eu-west-2.amazonaws.com/pastebin:dd3beea8a18b955a0050fa6cb59171ae0275b104"
      essential = true
      portMappings = [
        {
          containerPort = 80
          hostPort      = 80
        }
      ]
    }
  ])
}