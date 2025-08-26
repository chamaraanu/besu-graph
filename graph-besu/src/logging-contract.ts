import { Session, Log, LogSummary, ToolCall } from "../generated/schema"
import { LogsUploaded } from "../generated/LoggingContract/LoggingContract"

export function handleLogsUploaded(event: LogsUploaded): void {
  // Use hex of the indexed string (Bytes) as the ID
  const sessionKey = event.params.sessionID.toHex();

  // Session
  let session = Session.load(sessionKey);
  if (session == null) {
    session = new Session(sessionKey);
    session.save();
  }

  // Log (one per event)
  const logId = event.transaction.hash.toHex() + "-" + event.logIndex.toString();
  const log = new Log(logId);
  log.session = sessionKey;
  log.txHash = event.params.txHash;
  log.save();

  // Summaries + toolCalls
  const summaries = event.params.logs;
  for (let i = 0; i < summaries.length; i++) {
    const s = summaries[i];
    const summaryId = logId + "-" + i.toString();

    const summary = new LogSummary(summaryId);
    summary.log = logId;
    summary.userRequest = s.userRequest;
    summary.response = s.response;
    summary.save();

    const calls = s.toolCalls;
    for (let j = 0; j < calls.length; j++) {
      const c = calls[j];
      const callId = summaryId + "-" + j.toString();

      const call = new ToolCall(callId);
      call.summary = summaryId;
      call.name = c.name;
      call.args = c.args;
      call.result = c.result;
      call.save();
    }
  }
}