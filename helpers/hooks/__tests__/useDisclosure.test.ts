import { renderHook, act } from "@testing-library/react"
import { useDisclosure } from "../useDisclosure"
import { afterAll, describe, expect, test, vi } from "vitest"

describe("useDisclosure", () => {
    test("should set up hook with intital state of true", () => {
        const { result } = renderHook(useDisclosure, {
            initialProps: true,
        });
        
        expect(result.current[0]).toBeTruthy();
    });

    test("should call open handler to switch state from false to true", () => {
        const { result } = renderHook(useDisclosure, {
            initialProps: false,
        });

        act(() => result.current[1].open());
        
        expect(result.current[0]).toBeTruthy();
    });

    test("should call open handler to on already true state, and do nothing", () => {
        const { result } = renderHook(useDisclosure, {
            initialProps: true,
        });

        act(() => result.current[1].open());
        
        expect(result.current[0]).toBeTruthy();
    });

    test("should call close handler to switch state from true to false", () => {
        const { result } = renderHook(useDisclosure, {
            initialProps: false,
        });

        act(() => result.current[1].close());
        
        expect(result.current[0]).toBeFalsy();
    });

    test("should call toggle handler to flip state", () => {
        const { result } = renderHook(useDisclosure, {
            initialProps: false,
        });

        act(() => result.current[1].toggle());

        expect(result.current[0]).toBeTruthy();
    });

    test("should call the open handler and log the onOpen function", () => {
        const consoleMock = vi.spyOn(console, 'log').mockImplementation(() => undefined);

        afterAll(() => {
            consoleMock.mockReset();
        })

        const { result } = renderHook(
            ({ initialValue, options }) => useDisclosure(initialValue, options), {
                initialProps: {initialValue: false, options: {
                    onOpen: () => { console.log('This opened') }
                }},
        });

        act(() => result.current[1].open());
        
        expect(result.current[0]).toBeTruthy();
        expect(consoleMock).toHaveBeenLastCalledWith('This opened');
    });
})