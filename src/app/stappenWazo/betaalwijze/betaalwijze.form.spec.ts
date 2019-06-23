import { BetaalwijzeForm } from './betaalwijze.form';
import { IndicatieLoonheffingskortingEnum, JaNeeEnum, SoortRekeningnummerEnum } from 'src/app/shared';

let form: BetaalwijzeForm;

describe('BetaalwijzeForm', () => {
    beforeEach(() => {
        form = new BetaalwijzeForm();
    });

    it('should be invalid', () => {
        expect(form.invalid).toBe(true);
    });

    describe('indicatieLoonheffingskorting is ja;', () => {
        beforeEach(() => {
            form.controls.indicatieLoonheffingskorting.setValue(IndicatieLoonheffingskortingEnum.Ja);
        });

        it('should be invalid', () => {
            expect(form.invalid).toBe(true);
        });

        describe('indicatieVrijwilligeZW is ja;', () => {
            beforeEach(() => {
                form.controls.indicatieVrijwilligeZW.setValue(JaNeeEnum.ja);
            });

            it('should be invalid', () => {
                expect(form.invalid).toBe(true);
            });

            describe('soortRekeningnummer is Nederlands;', () => {
                beforeEach(() => {
                    form.controls.soortRekeningnummer.setValue(SoortRekeningnummerEnum.Nederland);
                });

                it('should be invalid', () => {
                    expect(form.invalid).toBe(true);
                });

                describe('IBAN is correct;', () => {
                    beforeEach(() => {
                        form.controls.IBAN.setValue('NL58HHBA0642762201');
                    });

                    it('should be invalid', () => {
                        expect(form.invalid).toBe(true);
                    });

                    describe('intentieverklaring', () => {
                        it('should be valid when true', () => {
                            form.controls.intentieverklaring.setValue(true);

                            expect(form.valid).toBe(true);
                        });

                        it('should be invalid when false', () => {
                            form.controls.intentieverklaring.setValue(false);

                            expect(form.invalid).toBe(true);
                        });
                    });
                });
            });
        });
    });
});
