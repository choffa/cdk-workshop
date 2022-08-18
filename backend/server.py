import boto3
import botocore
import json
import re

from os import environ
from uuid import uuid4

TABLE_NAME = environ.get("TASKS_TABLE_NAME")
ADD_TASK_RAW_PATH_AND_METHOD = ("/tasks", "POST")
GET_TASKS_RAW_PATH_AND_METHOD = ("/tasks", "GET")
UPDATE_TASKS_RAW_PATH_AND_METHOD = ("^/tasks/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$", "PUT")


def _get_task_table():
    return boto3.resource("dynamodb").Table(TABLE_NAME)

def _create_response(statusCode, body):
    return {
        'statusCode': statusCode,
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type, Accept',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*'
        },
        'body': body,
    }


def handler(event, context):
    path_and_method = (event["path"], event["httpMethod"])
    if (path_and_method == ADD_TASK_RAW_PATH_AND_METHOD):
        return add_task(event, context)
    elif (path_and_method == GET_TASKS_RAW_PATH_AND_METHOD):
        return get_tasks(event, context)
    elif (re.match(UPDATE_TASKS_RAW_PATH_AND_METHOD[0], path_and_method[0]) and UPDATE_TASKS_RAW_PATH_AND_METHOD[1] == path_and_method[1]):
        return update_task(event, context)
    else:
        return {'statusCode': 404, 'body': "Not Found"}


def add_task(event, context):
    task_table = _get_task_table()

    input = json.loads(event["body"])
    item = {
        "id": str(uuid4()),
        "description": input["description"],
        "done": False
    }

    task_table.put_item(Item=item)
    return _create_response(201, json.dumps(item))


def get_tasks(event, context):
    task_table = _get_task_table()
    table_scan_result = task_table.scan()
    return _create_response(200, json.dumps(table_scan_result["Items"]))


def update_task(event, context):
    task_table = _get_task_table()

    # Path is /events/{id}
    task_id = event["path"].split("/")[2]

    # Transform to AWS format and filter None values
    attribute_updates = {k: {"Value": v} for k, v in json.loads(event["body"]).items() if v is not None}

    try:
        result = task_table.update_item(
            Key={"id": task_id},
            Expected={ "id": { "ComparisonOperator": "NOT_NULL" } },
            AttributeUpdates=attribute_updates,
            ReturnValues="ALL_NEW"
        )
    except botocore.exceptions.ClientError as e:  
        if e.response['Error']['Code']=='ConditionalCheckFailedException':  
            return { 'statusCode': 404, 'body': f"Could not find key: {task_id}" }
    
    return _create_response(200, json.dumps(result["Attributes"]))
