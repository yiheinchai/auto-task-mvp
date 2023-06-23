# AutonomousTaskList
## Insipiration
- This is a side project of the AutonomousLLM project.
- This aims to provide a backend first GPT-powered task generation app. It was noticed when building AutonomousLLM that it had difficulty handling tasks and breaking them down into smaller tasks before attempting them.
- This project provides an API for AutonomousLLM to manage its tasks.

## User experience
- The user first starts with a complex task that it wants to complete.
- Then the user can use the 'auto' function to automatically generate subtasks.
- The user can repeat this process until the subtasks are deemed to be simple enough
- The user can then click 'execute' for GPT to execute the subtasks, such whatever tools the agent has.
- A evaluation is used to determine if the subtask is completed successfully and if so, it marks the subtask as completed.

## Looking forward
- Just like how humans can use this task management tool, it also provides a platform for AutonomousLLM or other AI agents to use it.
- This tool will be mainly backend API focused given that the user can vary from humans, to many different types of AI agents, a seperate client can be created for each of those users.
- As I am a human, I am prioritising building a web-based client and a VisonOS based client.

# Real world to-do list
## Inspiration
- Another inspiration is to bulid a real-world to-do-list. In the real world, no one has time to type everything out slowly and manually to a to-do list.
- The world is fast-paced, in your minds we create a virtual todo list from internal thoughts and spontaneous conversation with others.
- Most of the time, we do not actually have time to write everything down, we just keep working memory of tasks that we need to do.
- A real world to do list is able to list and see the things around us and determine action items to be completed, and if required break down those action items to smaller tasks.
- If possible, this real world to do list should execute those action autonomously with permission from the user.

## User experience
- The user goes about the day in the work environment with different conversations with co-workers.
- The transcript is parsed by GPT to generate hierarchied actionable items.
- Complex items are autonomatically broken down into smaller tasks.
- An agent (AutonomousLLM) can be hired to complete the tasks and it prompts the user if it wants the agent to complete the task for the user (with price $ of API call).
- Evaluation of success of task completion is conducted.

## Looking forward
- Looking forward, the agent that is hired to complete the task can come in any form, primarily physical agents can help to accomplish more household required tasks.
- The goal of this app is to create an unified API platform in which different agents are able to interface with the to-do-list.
- I expect there will be a big market for evaluators too, large systems designed to evaludate the success of autonomously completed tasks.
