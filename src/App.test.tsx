import { describe, expect, it } from 'vitest'
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

import App from "./App";

describe("Jev notes article", () => {
  it("renders an accessible responsive comparison table and labelled pipeline", () => {
    const { container } = render(<App />);
    expect(screen.getByRole("table", { name: /documented output-contract differences/i })).toBeTruthy();
    expect(screen.getByRole("columnheader", { name: "Jev / System One" })).toBeTruthy();
    expect(screen.getByRole("columnheader", { name: "Generative LLMs" })).toBeTruthy();
    expect(container.querySelector("figure.pipeline")).toHaveAccessibleName(/jev decision pipeline/i);
    expect(screen.getByText("State + question")).toBeTruthy();
    expect(screen.getByText(/Typed answer \+ probabilities for Choice and Score/)).toBeTruthy();
    expect(screen.getByText(/Choice\/Score probabilities; Noul has no confidence score/)).toBeTruthy();
    expect(screen.getByText("Code decides next step")).toBeTruthy();
    expect(container.querySelector(".comparison-wrap")?.classList.contains("overflow-x-auto")).toBe(false);
    expect(container.querySelector(".comparison-table tbody td")?.textContent).toMatch(/supplied state/);
  });

  it("starts directly with Jev and System One, has no byline, and ends with the anecdote", () => {
    const { container } = render(<App />);
    expect(container.querySelector("h1")?.textContent).toMatch(/Jev and System One/i);
    expect(container.querySelector(".byline")).toBeNull();
    expect(container.querySelector(".signature")).toBeNull();
    expect(container.querySelector("#jev h2")?.textContent).toMatch(/system one is a kind of decision model/i);
    expect(screen.getByText(/Imagine handing a school office a note and asking one clear question/i)).toBeTruthy();
    expect(container.querySelector(".pipeline-jev")?.textContent).toMatch(/Choice.*Score.*Noul/);
    expect(screen.getByText(/Imagine handing a school office a note and asking one clear question/i).closest("#jev")).toBeTruthy();
    expect(screen.getByRole("heading", { name: /a separate project from Convai Innovations/i })).toBeTruthy();
    expect(screen.getByRole("heading", { name: /how i used jev in a hackathon/i })).toBeTruthy();
    expect(container.querySelector("#day figure.hackathon-flow")).toHaveAccessibleName(/reply triage/i);
    expect(screen.getByText(/roughly 400 times faster/i)).toBeTruthy();
    expect(screen.getByText(/double-digit milliseconds/i)).toBeTruthy();
    expect(screen.getByRole("link", { name: /04 — Laya/i }).getAttribute("href")).toBe("#laya");
    expect(screen.getByRole("link", { name: /05 — Example use/i }).getAttribute("href")).toBe("#build");
    const laya = container.querySelector("#laya");
    expect(laya?.textContent).not.toMatch(/hackathon|100\/100|grading/i);
    expect(container.querySelector("#day")?.textContent?.match(/hackathon/gi)).toHaveLength(4);
    expect(container.querySelector("#day")?.textContent).toMatch(/24-hour hackathon began at 3pm/);
    expect(container.querySelector("#day")?.textContent).toMatch(/six or seven hours on system design/);
    expect(container.querySelector("#day")?.textContent).toMatch(/first code came around 8 or 9pm/);
    expect(container.querySelector("#day")?.textContent).toMatch(/theory round came first/);
    expect(container.querySelector("#day")?.textContent).toMatch(/100\/100/);
  });

  it("renders source-verified sections and training-data limitations", () => {
    const { container } = render(<App />);
    expect(screen.getByRole("heading", { name: /rlcd is a stated objective/i })).toBeTruthy();
    expect(screen.getByText(/The cited pages do not specify the training datasets or full recipe/i)).toBeTruthy();
    expect((screen.getByRole("link", { name: /System One: what Jev returns/i }) as HTMLAnchorElement).href).toBe("https://docs.typesafe.ai/concepts/system-one");
    expect((container.querySelector("#laya a") as HTMLAnchorElement).href).toBe("https://huggingface.co/convaiinnovations/laya");
    expect(container.textContent).not.toMatch(/By Soham|personal account by Soham|— Soham/i);
  });
});
