import "./App.css";

const sources = [
  {
    title: "System One: what Jev returns",
    url: "https://docs.typesafe.ai/concepts/system-one",
  },
  {
    title: "TypeSafe AI primer: RLCD, as described by TypeSafe",
    url: "https://docs.typesafe.ai/introduction/machine-learning-primer",
  },
  {
    title: "State: the material Jev evaluates",
    url: "https://docs.typesafe.ai/concepts/state",
  },
  {
    title: "Confidence: distributions, not guarantees",
    url: "https://docs.typesafe.ai/confidence",
  },
  {
    title: "Models: Jev 1.14 specifications",
    url: "https://docs.typesafe.ai/models",
  },
  {
    title: "Laya publisher model card (Convai Innovations)",
    url: "https://huggingface.co/convaiinnovations/laya",
  },
];

function App() {
  return (
    <main>
      <nav className="nav">
        <a className="wordmark" href="#top">
          jev<span>notes</span>
        </a>
        <a href="#sources">
          Sources <span aria-hidden="true">↗</span>
        </a>
      </nav>
      <header id="top" className="hero">
        <div className="eyebrow">
          <span className="pulse" /> DECISION MODELS <span aria-hidden="true">·</span> 5 MIN READ
        </div>
        <h1>
          Jev and System One.
          <br />
          <em>What do those words mean?</em>
        </h1>
        <p className="dek">
          Jev is a model that helps an app make a focused choice, such as which team
          should handle a message. TypeSafe calls this kind of decision-focused
          model “System One.” Here’s how it works, what TypeSafe says about it,
          and what its public docs leave unanswered.
        </p>
        <div
          className="hero-art"
          role="img"
          aria-label="A conceptual illustration contrasting a decision model's typed judgment with a text-generating model. Not an architecture diagram."
        >
          <div className="art-label">Two different contracts with software</div>
          <div className="compare">
            <div className="compare-card">
              <small>GENERATIVE MODEL</small>
              <b>“Here’s a response…”</b>
              <span>Open-ended text</span>
            </div>
            <div className="versus">≠</div>
            <div className="compare-card decision">
              <small>SYSTEM ONE · JEV</small>
              <b>choice: billing</b>
              <span>Choice/Score probabilities; Noul has no confidence score</span>
            </div>
          </div>
          <div className="art-note">
            <span className="spark">✳</span> Conceptual comparison from public
            docs, not a claim about undisclosed internals.
          </div>
        </div>
      </header>
      <article>
        <aside className="toc">
          <span>IN THIS NOTE</span>
          <a href="#jev">01 — Jev and System One</a>
          <a href="#uncertainty">02 — Confidence</a>
          <a href="#training">03 — Training objective</a>
          <a href="#laya">04 — Laya</a>
          <a href="#build">05 — Example use</a>
          <a href="#day">06 — How I used Jev in a hackathon</a>
        </aside>
        <div className="story">
          <section id="jev">
            <div className="section-no">01 <span>—</span> JEV AND SYSTEM ONE</div>
            <h2>System One is a kind of decision model. Jev is TypeSafe’s first.</h2>
            <p>
              TypeSafe uses <strong>System One</strong> for models that answer
              focused questions with a choice, score, or yes/no judgment. <strong>Jev</strong>{" "}
              is the first model in that category. TypeSafe says “System One”
              refers to psychologist Daniel Kahneman’s concept of fast,
              intuitive thought. It is an analogy for the model’s intended role,
              not a claim that software thinks like a person.
            </p>
            <p>
              Imagine handing a school office a note and asking one clear
              question: “Which desk should handle this?” A language model can
              write a reply about the note. Jev is designed to return a defined
              answer, such as “counsellor.” For Choice and Score answers, it
              also returns probabilities; a yes/no answer does not include a
              confidence score. That difference is about each model’s documented
              role, not a claim that one is always better.
            </p>
            <p>
              The app provides a <strong>state</strong>—the information to
              examine—and a question that defines the judgment. Jev returns a
              typed answer: <strong>Choice</strong> (pick from options),
              <strong> Score</strong> (choose a level on a scale), or
              <strong> Noul</strong> (yes or no). The app—not Jev—decides what
              happens next. TypeSafe says multiple questions can use the same
              state and are evaluated independently.
            </p>

            <div className="comparison-wrap">
              <table className="comparison-table">
                <caption>Documented output-contract differences</caption>
                <thead><tr><th scope="col">Dimension</th><th scope="col">Jev / System One</th><th scope="col">Generative LLMs</th></tr></thead>
                <tbody>
                  <tr><th scope="row">Input</th><td>Evaluates a supplied state against defined questions.</td><td>Generates text in response to a prompt.</td></tr>
                  <tr><th scope="row">Output</th><td>Typed answer: Choice, Score, or Noul; Choice and Score include probabilities.</td><td>Generated prose or other text.</td></tr>
                  <tr><th scope="row">Application role</th><td>Application code inspects the typed judgment and decides the next step.</td><td>Text can serve open-ended responses; no broader implementation claim is implied.</td></tr>
                </tbody>
              </table>
            </div>
            <figure className="pipeline" aria-labelledby="pipeline-caption">
              <figcaption id="pipeline-caption">Jev decision pipeline: the application supplies state and a question, receives a typed answer and, for Choice or Score, probabilities, then decides what to do.</figcaption>
              <div className="pipeline-flow">
                <div className="pipeline-step"><small>INPUT</small><b>State + question</b><span>Context and a defined judgment</span></div>
                <span className="pipeline-arrow" aria-hidden="true">→</span>
                <div className="pipeline-step pipeline-jev"><small>JEV · SYSTEM ONE</small><b>Typed answer + probabilities for Choice and Score</b><span>Choice · Score · Noul</span></div>
                <span className="pipeline-arrow" aria-hidden="true">→</span>
                <div className="pipeline-step"><small>OUTPUT</small><b>Code decides next step</b><span>Route, check, or review</span></div>
              </div>
            </figure>
            <div className="type-grid">
              <div>
                <span>CHOICE</span>
                <b>Which one?</b>
                <small>billing · technical · account</small>
              </div>
              <div>
                <span>SCORE</span>
                <b>How much?</b>
                <small>0 calm → 2 very frustrated</small>
              </div>
              <div>
                <span>NOUL</span>
                <b>Yes or no?</b>
                <small>Does this request a refund?</small>
              </div>
            </div>
            <p>
              Jev’s state is the material being evaluated. According to
              TypeSafe’s docs, it may be a string, JSON object, or array.
              Multiple questions in one request see the same state and are
              evaluated independently. That is a practical boundary: put the
              relevant facts in the state, define the question separately, then
              combine returned judgments with ordinary code checks and human
              review where needed.
            </p>
          </section>
          <section id="uncertainty">
            <div className="section-no">
              02 <span>—</span> CONFIDENCE, NOT CERTAINTY
            </div>
            <h2>A probability is useful. It is not a promise.</h2>
            <p>
              Jev can return probabilities with its choices or scores. Think of
              them as a weather forecast: useful for planning, but not a promise
              about what happens in one particular case. TypeSafe describes
              calibration as something to
              check across many predictions, not a guarantee about one answer.
            </p>
            <p>
              For an important decision, test the model on the kinds of examples
              the app will really see, set cautious rules, and send uncertain
              cases to a person. The application—not the model—chooses what to
              do next.
            </p>
            <div className="honesty">
              <span className="honesty-icon">!</span>
              <div>
                <b>Confidence is not correctness</b>
                <p>
                  Use probabilities to design a review policy. Measure outcomes
                  on your own data, monitor drift, and keep a path for ambiguous
                  cases.
                </p>
              </div>
            </div>
            <p>
              One useful mindset is to treat the typed answer as a signal in a
              larger system. Your code can check constraints, compare with
              policy, ask for clarification, or hand off to a person.
              “Structured” makes an answer easier to consume; it does not make
              the answer infallible.
            </p>
          </section>
          <section id="training">
            <div className="section-no">
              03 <span>—</span> WHAT THE TRAINING DOCS SAY
            </div>
            <h2>RLCD is a stated objective, not a public recipe.</h2>
            <p>
              TypeSafe says Jev is post-trained with RLCD, short for
              Reinforcement Learning for Calibrated Decisions. TypeSafe says
              the goal is to improve decisions and make probabilities better
              reflect observed outcomes. That is a training objective, not
              evidence that every answer will be right.
            </p>
            <p>
              That is what TypeSafe publicly says about the goal. Its cited
              pages do not give the full training recipe or name the datasets.
              TypeSafe says Jev is not fine-tuned or LoRA-adapted with
              customer data, and the same weights serve every account. The
              company also says it does not train on customer requests or
              responses. Those are
              TypeSafe’s published statements, not an independent audit.
            </p>
            <div className="honesty">
              <span className="honesty-icon">i</span>
              <div>
                <b>What the cited docs do not tell us</b>
                <p>
                  The cited pages do not specify the training datasets or full recipe.
                  They explain the stated goal, but not how the model was built
                  step by step.
                </p>
              </div>
            </div>
          </section>
          <section id="laya">
            <div className="section-no">
              04 <span>—</span> LAYA
            </div>
            <h2>A separate project from Convai Innovations.</h2>
            <p>
              Laya is a separate project, not a TypeSafe or Jev model. The
              Convai Innovations <a href="https://huggingface.co/convaiinnovations/laya" target="_blank" rel="noreferrer">model card</a>{" "}
              describes it as a multilingual, non-autoregressive System 1
              decision model. That is the publisher’s description; it does not
              establish that Laya and Jev work the same way.
            </p>
          </section>
          <section id="build">
            <div className="section-no">
              05 <span>—</span> WHERE IT FITS
            </div>
            <h2>A focused judgment can be one component.</h2>
            <p>
              For a refund workflow, an app could provide the customer message,
              transaction facts, and policy as state, then ask whether a refund
              was requested and whether the policy allows one. Jev returns
              judgments; ordinary program logic can check the transaction,
              apply firm rules, and send uncertain or consequential cases to a
              person. This is one possible use, not a guarantee about results.
            </p>
            <p>
              Free-form generation still suits jobs such as drafting an
              explanation or holding an open-ended conversation. System One
              describes a different kind of task: give a defined judgment for
              the application to use.
            </p>
          </section>
          <section id="day">
            <div className="section-no">
              06 <span>—</span> A 24-HOUR HACKATHON
            </div>
            <h2>How I used Jev in a hackathon</h2>
            <p>
              We used Jev in the reply-triage path. Incoming replies first went
              through exact button or phrase rules. For everything else, Jev
              classified the intent and tracked what the task was waiting on,
              what remained, and how far it had progressed. A plain-code gate
              then routed the task to blocked, complete, in progress, or human
              review. If Jev was unsure, an LLM handled the fallback
              classification. Every transition was recorded so we could trace
              the decision and undo it if needed.
            </p>
            <figure className="hackathon-flow" aria-labelledby="hackathon-flow-caption">
              <figcaption id="hackathon-flow-caption">
                Reply triage: model judgments inform the workflow, while code
                controls state changes.
              </figcaption>
              <div className="flow-start">Incoming reply</div>
              <div className="flow-connector" aria-hidden="true" />
              <div className="flow-decision">Button press or exact phrase?</div>
              <div className="flow-branches">
                <div className="flow-branch flow-branch-rules">
                  <span className="flow-label">YES · MATCHED RULE</span>
                  <div className="flow-node">Rules set confidence to 1.0</div>
                  <div className="flow-connector" aria-hidden="true" />
                  <div className="flow-node">Use the matched fields</div>
                </div>
                <div className="flow-branch flow-branch-jev">
                  <span className="flow-label">NO · CHECK REPLY</span>
                  <div className="flow-node flow-node-accent">
                    <b>Jev classifies</b>
                    <span>Intent · waiting on · work left · progress</span>
                  </div>
                  <div className="flow-connector" aria-hidden="true" />
                  <div className="flow-decision">Confident enough?</div>
                  <div className="flow-confidence-branches">
                    <div><span className="flow-label">YES</span><div className="flow-node">Use Jev’s fields</div></div>
                    <div className="flow-fallback">
                      <span className="flow-label">NO</span>
                      <div className="flow-node">LLM classification fallback</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flow-merge flow-merge-inputs" aria-hidden="true"><span /> <span /> <span /></div>
              <div className="flow-node flow-extract">
                <b>Extract the useful fields</b>
                <span>Blocker · ETA · proof URL</span>
              </div>
              <div className="flow-connector" aria-hidden="true" />
              <div className="flow-decision">Plain-code gate</div>
              <div className="flow-outcomes">
                <div className="flow-outcome"><span className="flow-label">WAITING ON SOMEONE</span><div className="flow-node">Blocked, even if the reply says “done”</div></div>
                <div className="flow-outcome"><span className="flow-label">DONE · NO HEADING · HIGH CONFIDENCE</span><div className="flow-node flow-node-accent">Complete</div></div>
                <div className="flow-outcome"><span className="flow-label">PROGRESS</span><div className="flow-node">In progress</div></div>
                <div className="flow-outcome"><span className="flow-label">UNCERTAIN</span><div className="flow-node flow-node-review">Ask the lead to review in chat</div></div>
              </div>
              <div className="flow-event-merge" aria-hidden="true"><span /><span /><span /><span /></div>
              <div className="flow-event">
                <b>Record the transition</b>
                <span>Old → new · gate · engine · confidence · trace · undo snapshot</span>
              </div>
              <p className="flow-note">
                These are the stages of our implementation, not claims about
                Jev’s internal reasoning. Rules and code handled routing;
                Jev supplied a typed classification signal.
              </p>
            </figure>
            <p>
              The practical win was speed and a more predictable handoff. In
              our implementation, we measured the Jev path at roughly 400 times
              faster than our previous classification path, with latency in the
              double-digit milliseconds. Those are our hackathon measurements,
              not a general benchmark for Jev. Exact rules handled clear cases,
              Jev handled natural-language replies, and the gate kept uncertain
              or blocked work from being marked complete without review.
            </p>
            <p>
              Our 24-hour hackathon began at 3pm. We spent the first six or
              seven hours on system design, so our first code came around 8 or
              9pm. The theory round came first, and we scored 100/100. That
              early score gave us a boost before the longer build began.
            </p>
          </section>
        </div>
      </article>
      <footer id="sources">
        <div>
          <span className="section-no">SOURCE DESK · CHECKED OCTOBER 2026</span>
          <h2>Primary sources</h2>
          <p>
            Product facts above are attributed to TypeSafe’s official
            documentation. The RLCD discussion is explicitly presented as
            TypeSafe’s account. Laya is presented separately, using its
            publisher’s model card for claims about that project, not as a
            TypeSafe model or an independently verified performance claim.
          </p>
        </div>
        <div className="source-links">
          {sources.map((s, i) => (
            <a key={s.title} href={s.url} target="_blank" rel="noreferrer">
              <span>0{i + 1}</span>
              {s.title}
              <span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
        <div className="footnote">
          Product details can change; check linked docs for current
          specifications.
        </div>
      </footer>
      <a className="top-link" href="#top" aria-label="Back to top">
        ↑
      </a>
    </main>
  );
}
export default App;
