import { newMockEvent } from "matchstick-as"
import { ethereum } from "@graphprotocol/graph-ts"
import { LogsUploaded } from "../generated/LoggingContract/LoggingContract"

export function createLogsUploadedEvent(
  sessionID: string,
  logs: Array<ethereum.Tuple>,
  txHash: string
): LogsUploaded {
  let logsUploadedEvent = changetype<LogsUploaded>(newMockEvent())

  logsUploadedEvent.parameters = new Array()

  logsUploadedEvent.parameters.push(
    new ethereum.EventParam("sessionID", ethereum.Value.fromString(sessionID))
  )
  logsUploadedEvent.parameters.push(
    new ethereum.EventParam("logs", ethereum.Value.fromTupleArray(logs))
  )
  logsUploadedEvent.parameters.push(
    new ethereum.EventParam("txHash", ethereum.Value.fromString(txHash))
  )

  return logsUploadedEvent
}
