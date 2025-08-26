import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import {} from "@graphprotocol/graph-ts"
import { LogsUploaded } from "../generated/schema"
import { LogsUploaded as LogsUploadedEvent } from "../generated/LoggingContract/LoggingContract"
import { handleLogsUploaded } from "../src/logging-contract"
import { createLogsUploadedEvent } from "./logging-contract-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let sessionID = "Example string value"
    let logs = ["ethereum.Tuple Not implemented"]
    let txHash = "Example string value"
    let newLogsUploadedEvent = createLogsUploadedEvent(sessionID, logs, txHash)
    handleLogsUploaded(newLogsUploadedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("LogsUploaded created and stored", () => {
    assert.entityCount("LogsUploaded", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "LogsUploaded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "sessionID",
      "Example string value"
    )
    assert.fieldEquals(
      "LogsUploaded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "logs",
      "[ethereum.Tuple Not implemented]"
    )
    assert.fieldEquals(
      "LogsUploaded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "txHash",
      "Example string value"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
