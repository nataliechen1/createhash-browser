#!/usr/bin/env mocha -R spec

import {strict as assert} from "assert";
import {createHash} from "../lib/createhash-browser";

const TESTNAME = __filename.split("/").pop();

describe(TESTNAME, () => {

    it("Multiple update()s", shouldRejected(async () => {
        await createHash("SHA1").update("").update("").digest("hex");
    }));

    it("Invalid algorithm with empty input", shouldRejected(async () => {
        await createHash("invalid").update("").digest("hex");
    }));

    it("Invalid algorithm without input", shouldRejected(async () => {
        await createHash("invalid").digest("hex");
    }));
});

function shouldRejected(fn: () => Promise<any>) {
    return async () => {
        let reason: any;
        await Promise.resolve().then(fn).catch(e => reason = e);
        assert.ok(reason, "should be rejected");
    };
}